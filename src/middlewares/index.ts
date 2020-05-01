import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleMorgan,
  handleHelmet,
} from "./common";

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleMorgan,
  handleHelmet,
];
