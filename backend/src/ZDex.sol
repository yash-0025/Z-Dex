// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./PriceConsumer.sol";

contract ZDex is ReentrancyGuard {
    IERC20 public ethReserve;
    uint256 public tokenReserve;

    event LiquidityAdded(address provider, uint256 ethAmount, uint256 tokenAmount);
    event LiquidityRemoved(address provider, uint256 ethAmount, uint256 tokenAmount);
    event PurchaseToken(address buyer, uint256 ethAmount, uint256 tokenAmount);
    event PurchaseETH(address seller, uint256 tokenAmount, uint256 ethAmount);

    constructor(address _token, address _priceFeed) {
        token = IERC20(_token);
        priceConsumer = new PriceConsumer(_priceFeed);
    }

    function getTokenPriceInETH() public view returns (uint256) {
        int latestPrice = priceConsumer.getLatestPrice();
        uint8 decimals = priceConsumer.getPriceDecimals();
        return uint256(latestPrice) * (1 ether / 10 ** uint256(decimals));
    }

    function addLiquidity(uint256 tokenAmount) public payable nonReentrant {
        require(tokenAmount > 0 && msg.value > 0, "Amount cannot be zero");
        if(ethReserve == 0 && tokenReserve == 0) {
            ethReserve = msg.value;
            tokenReserve = tokenAmount;
        } else {
            uint256 ethRatio = (msg.value * tokenReserve) / ethReserve;
            require(tokenAmount >= ethRatio, "Incorrect token amount for liquidity");

            ethReserve += msg.value;
            tokenReserve += tokenAmount;
        }
        require(token.transferFrom(msg.sender, address(this), tokenAmount), "Token Transfer failed");
        emit LiquidityAdded(msg.sender, msg.value, tokenAmount);
    }
}

function removeLiquidity(uint256 liquidityTokens) public nonReentrant {
    require(liquidityTokens > 0, "Cannot Remove zero token");
    uint256 ethAmount = (ethReserve * liquidityTokens) / tokenReserve;
    uint256 tokenAmount = liquidityTokens;

    ethReserve -= ethAmount;
    tokenReserve -= tokenAmount;

    payable(msg.sender).transfer(ethAmount);
    require(token.transfer(msg.sender, tokenAmount), "Token transfer failed");

    emit LiquidityRemoved(msg.sender, ethAmount, tokenAmount);
}


function ethToTokenSwap(uint256 minTokens) public payable nonRenetrant {
    require(msg.value > 0, "ETH amount should be greater than zero");
    uint256 tokenAmount = getInputAmount(tokenAmount, tokenReserve, ethReserve);
    require(ethAmount >= mintEth, "Insufficient output amount");

    ethReserve += msg.value;
    tokenReserve -= tokenAmount;

    require(token.transfer(msg.sender, tokenAmount), "Failed to transfer token");
    emit PurchaseToken(msg.sender, msg.value, tokenAmount);
}

function getInputAmount(uint256 inputAmount, uint256 inputReserve, uint256 outputReserve) internal pure returns(uint256){
    require(inputReserve > 0 && outputReserve > 0, "Invalid reserve");
    uint256 inputAmountWithFee = inputAmount * 997;
    uint256 numerator = inputAmountWithFee * outputReserve;
    uint256 denominator = (inputReserve *1000) + inputAmountWithFee;
    return numeratore / denominator;
}

function tokenToEthSwap(uint256 tokenAmount, uin256 minEth) public nonReentrant {
    require(tokenAmount > 0, "Token should be more than zero");
    uint256 ethAmount = getInputAmount(tokenAmount, tokenReserve, ethReserve);
    require(ethAmount >= minEth, "Insufficient amount to swap");

    tokenReserve += tokenAmount;
    ethReserve -= ethAmount;

    require(token.transferFrom(msg.sender, address(this), tokenAmount), "Failed while transferring tokens");
    payable(msg.sender).transfer(ethAmount);
    emit PurchaseETH(msg.sender, tokenAmount, ethAmount);
}


function getTokenAmount(uint256 ethAmount) public view returns (uint256) {
    return getInputAmount(ethAmount, ethReserve, tokenReserve);
}

function getEthAmount(uint256 tokenAmount) public view returns(uint256) {
    return getInputAmount(tokenAmount, tokenReserve, ethReserve);
}