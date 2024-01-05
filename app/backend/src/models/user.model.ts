import UserModelSequelize from '../database/models/user-model-sequelize';

class UserModel {
  private userModel = UserModelSequelize;

  public async findById(id: number): Promise<UserModelSequelize | null> {
    const response = this.userModel.findByPk(id);
    return response;
  }

  async findByEmail(email: string): Promise<UserModelSequelize | null> {
    const response = this.userModel.findOne({ where: { email } });
    return response;
  }
}

export default UserModel;
