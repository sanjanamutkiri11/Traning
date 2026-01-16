10.times do
    Blog.create!(
      title: "Published Blog",
      body: "This is a published blog content",
      published: true
    )
  end
  
  10.times do
    Blog.create!(
      title: "Unpublished Blog",
      body: "This is an unpublished blog content",
      published: false
    )
  end
  