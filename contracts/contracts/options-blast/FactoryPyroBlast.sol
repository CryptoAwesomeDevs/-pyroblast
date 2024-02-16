// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import {OptionPyroBlast} from "./OptionPyroBlast.sol";
import {CreateOptionParams} from "./models/CreateOptionParams.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract FactoryPyroBlast is Ownable {

    struct Option {
        uint256 id;
        address optionAddress;
        string optionName;
        bool initialized;
    }

    struct ListOptionResponse {
        Option[] options;
        uint256 optionCount;
    }

    uint256 public optionCount;
    mapping(uint256 => Option) private options;

    function createOption(CreateOptionParams calldata params) public {
        require(params.tokensOut.length == params.poolFees.length, "Wrong arrays calldata");
        OptionPyroBlast option = new OptionPyroBlast(params);
        options[optionCount] = Option(optionCount, address(option), params.name, true);
        optionCount++;
        option.transferOwnership(msg.sender);
    }

    function listOptions(uint256 from, uint256 to) external view returns (ListOptionResponse memory) {
        require(from <= to, "Incorrect range");
        uint256 num = getOptionNumberInRange(from, to);
        Option[] memory filteredOptions = getOptionsInRange(from, to, num);
        return ListOptionResponse(filteredOptions, optionCount);
    }

    function deleteOption(uint256 id) external {
        delete options[id];
    }

    function getOptionNumberInRange(uint256 from, uint256 to) private view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = from; i <= to; i++) {
            if (options[i].initialized) {
                count++;
            }
        }
        return count;
    }

    function getOptionsInRange(uint256 from, uint256 to, uint256 num) private view returns (Option[] memory) {
        Option[] memory initializedOptions = new Option[](num);
        uint256 counter = 0;
        for (uint256 i = from; i <= to; i++) {
            if (options[i].initialized) {
                initializedOptions[counter++] = options[i];
            }
        }
        return initializedOptions;
    }
}