import assertString from './util/assertString';

const bech32 = /^(bc1|bc1p)[ac-hj-np-z02-9]{39,58}$/;
const bech32Testnet = /^(tb1|tb1p)[ac-hj-np-z02-9]{39,58}$/;
const base58 = /^[13][A-HJ-NP-Za-km-z1-9]{25,34}$/;
const base58Testnet = /^[2mn][A-HJ-NP-Za-km-z1-9]{25,34}$/;

const networks = {
  main: [bech32, base58],
  test: [bech32Testnet, base58Testnet],
  regtest: [bech32Testnet, base58Testnet],
  any: [bech32, bech32Testnet, base58, base58Testnet],
};

export default function isBtcAddress(str, network) {
  assertString(str);
  // The default (no `network` argument) keeps the legacy "any network" behavior
  // so existing callers and tests that pre-date the network argument still pass.
  const key = network === undefined ? 'any' : network;
  const patterns = networks[key];
  if (!patterns) {
    throw new Error(`Invalid network '${network}'`);
  }
  return patterns.some(re => re.test(str));
}
