class CreateBlogs < ActiveRecord::Migration[8.1]
  def change
    create_table :blogs do |t|
      t.string :title
      t.text :body
      t.references :user, null: false, foreign_key: true
      t.boolean :published

      t.timestamps
    end
  end
end
