export default class UserInfo {
    constructor({userName, userJob, avatar}) {
        this._userName = userName;
        this._userJob = userJob;
        this._avatar = avatar;
    }

    getUserInfo() {
      return {
        name: this._userName.textContent,
        job: this._userJob.textContent,
        avatar: this._avatar.src,
      };
    };

    setUserInfo(name, job) {
      this._userName.textContent = name;
      this._userJob.textContent = job;
    };

    setAvatarInfo(avatar) {
      this._avatar.src = avatar;
    };

};