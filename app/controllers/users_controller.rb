class UsersController < ApplicationController

  def show
    respond_to do |format|
      format.json { render json: User.all.to_json }
    end
  end

  def create
    respond_to do |format|
      data = params[:data][:data]
      data = data.drop(1)
      data.each do |user|
        u = User.new(first_name: user[0], last_name: user[1], age: user[2], sex: user[3])
        u.save!
      end
      format.json { render json: User.all.to_json }
    end
  end
end
