import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xB0C624Cc2F55B56b1Cac788CEB594bfAa967Aa04'
);

export default instance;
