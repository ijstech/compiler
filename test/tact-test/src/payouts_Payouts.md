# TACT Compilation Report
Contract: Payouts
BOC Size: 991 bytes

# Types
Total Types: 11

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## StdAddress
TLB: `_ workchain:int8 address:uint256 = StdAddress`
Signature: `StdAddress{workchain:int8,address:uint256}`

## VarAddress
TLB: `_ workchain:int32 address:^slice = VarAddress`
Signature: `VarAddress{workchain:int32,address:^slice}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## CanPayout
TLB: `can_payout#c41949df amount:int257 = CanPayout`
Signature: `CanPayout{amount:int257}`

## CanPayoutResponse
TLB: `can_payout_response#ffeb40de amount:int257 address:address ok:bool = CanPayoutResponse`
Signature: `CanPayoutResponse{amount:int257,address:address,ok:bool}`

## Beacon$Data
TLB: `null`
Signature: `null`

## Payouts$Data
TLB: `null`
Signature: `null`

# Get Methods
Total Get Methods: 1

## owner

# Error Codes
* 2: Stack underflow
* 3: Stack overflow
* 4: Integer overflow
* 5: Integer out of expected range
* 6: Invalid opcode
* 7: Type check error
* 8: Cell overflow
* 9: Cell underflow
* 10: Dictionary error
* 11: 'Unknown' error
* 12: Fatal error
* 13: Out of gas error
* 14: Virtualization error
* 32: Action list is invalid
* 33: Action list is too long
* 34: Action is invalid or not supported
* 35: Invalid source address in outbound message
* 36: Invalid destination address in outbound message
* 37: Not enough Toncoin
* 38: Not enough extra currencies
* 39: Outbound message does not fit into a cell after rewriting
* 40: Cannot process a message
* 41: Library reference is null
* 42: Library change action error
* 43: Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree
* 50: Account state size exceeded limits
* 128: Null reference exception
* 129: Invalid serialization prefix
* 130: Invalid incoming message
* 131: Constraints error
* 132: Access denied
* 133: Contract stopped
* 134: Invalid argument
* 135: Code of a contract was not found
* 4429: Invalid sender
* 16059: Invalid value
* 48401: Invalid signature
* 62972: Invalid balance

# Trait Inheritance Diagram

```mermaid
graph TD
Payouts
Payouts --> BaseTrait
Payouts --> OwnableTransferable
OwnableTransferable --> BaseTrait
OwnableTransferable --> Ownable
Ownable --> BaseTrait
Payouts --> Ownable
```

# Contract Dependency Diagram

```mermaid
graph TD
Payouts
Payouts --> Beacon
```