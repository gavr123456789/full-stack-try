export interface LoginStoreInit {
  isLogIn: boolean
}

export interface LoginDto {
  login: string
  password: string
}


// export type NoOperation = {
//   opCode: 'NOP';
// };
// export type LogicalAndOperation = {
//   opCode: 'AND';
//   source: string;
//   destination: string;
// };
// export type LogicalOrOperation = {
//   opCode: 'OR';
//   source: string;
//   destination: string;
// };
// export type Operation =
//   NoOperation |
//   LogicalAndOperation |
//   LogicalOrOperation;

// export type OperationOpCode = Operation['opCode'];


const buildLogicalAnd = (source: string, destination: string) => ({
  opCode: 'AND' as const,
  source,
  destination,
});


const buildLogicalOr = (source: string, destination: string) => ({
  opCode: 'OR' as const,
  source,
  destination,
});


const buildLogicalNot = () => ({
  opCode: 'NOT' as const,
});


type LogicalAnd = ReturnType<typeof buildLogicalAnd>;
type LogicalOr = ReturnType<typeof buildLogicalOr>;
type LogicalNot = ReturnType<typeof buildLogicalNot>;

type Operator = LogicalAnd | LogicalOr | LogicalNot

function sas(x: Operator) {
  switch (x.opCode) {
    case "AND":
      break;
  
    default:
      break;
  }
}

sas(buildLogicalNot())
sas(buildLogicalAnd("j", "j"))
sas({opCode: "NOT"})
sas({opCode: "AND", destination: "hj", source: "hj"})
