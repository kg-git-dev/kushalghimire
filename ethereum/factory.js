import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x12e2a5e646aC5df6517a71F6ab542EA88fACb65C'
);

export default instance;
