pragma solidity >=0.4.25 ;



contract KISS {

	mapping (address => uint) balances;
	//mapping (uint => uint) counter;
	//uint token;

	constructor()public{
		balances[msg.sender] = 1000;
	}

/*	function DoHelp(address receiver, uint Hours, uint service) public {
		token = Hours;
		balances[receiver] += token;
		counter[service] += 1;
	}*/

	//function getServiceCounter (uint _service) public view returns(uint){
	//	return counter[_service];
	//}

    function transfer(address reciever, uint value)public {
        require( balances[msg.sender]-value >= 0);
        require( reciever != msg.sender );
        balances[msg.sender] -= value;
        balances[reciever] += value;
    }

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
