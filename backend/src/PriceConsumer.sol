// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumer {
    AggregatorV3Interface internal priceFeed;

    constructor(address _priceFeed) {
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    function getLatestPrice() public view returns (int) {
        (, int price, , ,) = priceFeed.latestRoundData();
        return price;
    }

    function getPriceDecimals() public view returns(uint8) {
        return priceFeed.decimals();
    }
}