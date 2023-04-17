

const BannerForm = ({ handleCreate, name, setName, content, setContent, background, setBackground, isActive, setIsActive, position, setPosition, order, setOrder }) => {
  
  
    return (
      <>
        <form onSubmit={handleCreate}>
        <div className="mb-3">
                <h5>Banner name</h5>
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <h5>Content:</h5>
                <textarea
                  type="text"
                  value={content}
                  placeholder="write a content"
                  className="form-control"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {background ? background.name : "Upload Background"}
                  <input
                    type="file"
                    name="background"
                    accept="image/*"
                    onChange={(e) => setBackground(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {background && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(background)}
                      alt="banner_bg"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <h5>Status</h5>
                <Select
                  bordered={false}
                  placeholder="Select Status "
                  size="large"
                   showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setIsActive(value);
                  }}
                >
                  <Option value="Active">Active</Option>
                  <Option value="Not Active">Not Active</Option>
                </Select>
              </div>
              <div className="mb-3">
                <h5>Position</h5>
                <Select
                  bordered={false}
                  placeholder="Select Position "
                  size="large"
                  value={position}
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setPosition(value);
                  }}
                >
                  <Option value="Top">Top</Option>
                  <Option value="Bottom">Bottom</Option>
                  <Option value="Left">Left</Option>
                  <Option value="Right">Right</Option>
                </Select>
              </div>
              <div className="mb-3">
                <h5>Order: </h5>
                <Select
                  bordered={false}
                  placeholder="1"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setOrder(value);
                  }}
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                </Select>
              </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    );
  };
  
  export default BannerForm;
  