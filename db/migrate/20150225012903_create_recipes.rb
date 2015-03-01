class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :size
      t.string :ingredient
      t.string :direction

      t.timestamps null: false
    end
  end
end
