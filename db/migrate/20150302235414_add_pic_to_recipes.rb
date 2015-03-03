class AddPicToRecipes < ActiveRecord::Migration
  def change
    add_column :recipes, :pic, :string
  end
end
