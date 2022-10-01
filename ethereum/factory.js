import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x19C97Cf89e1793396EaE194D47CD442dE31f1a90'
);

export default instance;
