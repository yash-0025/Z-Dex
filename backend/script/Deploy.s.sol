// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Token.sol";
import "../src/ZDex.sol";

contract DeployScript is Script {
    function run() external {
        string memory deployerPrivateKeyHX =string.concat("0x", vm.envString("PRIVATE_KEY"));
        uint256 deployerPrivateKey=vm.parseUint(deployerPrivateKeyHX);
        vm.startBroadcast(deployerPrivateKey);

        Token token = new Token("ZDex Token", "ZDEX", 1000000 ether);

        address priceFeed = 0x694AA1769357215DE4FAC081bf1f309aDC325306;

        ZDex zdex = new ZDex(address(token), priceFeed);

        vm.stopBroadcast();

        console.log("Token Deployed ::", address(token));
        console.log("ZDEX Deployed :: ", address(zdex));
    }
}

