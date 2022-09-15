import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x015A26FbEB492c1b970b9625e4216372cc164A64'
);

export default instance;
