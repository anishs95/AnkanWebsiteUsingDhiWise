const reward = require('../http-common').reward;

class RewardService{
    

    GetUserReward(){
        return reward.get("GetUserReward/"+"6315b73aec764d5a5c5e74eb");
    }

    getRewardsByUser(){
        return reward.get("GetRewardsByUser/"+"6315b73aec764d5a5c5e74eb");
    }



}

export default new RewardService();