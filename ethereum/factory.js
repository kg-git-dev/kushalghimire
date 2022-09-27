import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xB04d083C8d425B7fd3Ff63F8d30FC8f555a84059'
);

export default instance;
