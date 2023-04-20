const BannerForm = ({
  name,
  setName,
  content,
  setContent,
  background,
  setBackground,
  isActive,
  setIsActive,
  position,
  setPosition,
  order,
  setOrder,
}) => {
  const [banner, setBanner] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [background, setBackground] = useState("");
  const [position, setPosition] = useState("");
  const [isActive, setIsActive] = useState("");

  const { id } = useParams();
  console.log(id);
  // get single user
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const banner = await axios.get(`/api/v1/auth/banners/get-banner/${id}`);
        console.log(banner);
        setBanner(banner.data);
        setName(banner.data.name);
        setContent(banner.data.content);
        setBackground(banner.data.background);
        setPosition(banner.data.position);
        setIsActive(banner.data.isActive);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);
  console.log(id, banner)

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);
    formData.append("background", background);
    formData.append("isActive", isActive);
    formData.append("position", position);
    formData.append("order", order);
    try {
      const res = await axios.put(`/api/v1/auth/banners/update-banner/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      // Handle success case
    } catch (error) {
      console.log(error);
      // Handle error case
    }
  };
  return (
    <>
      <form onSubmit={handleUpdate}>
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
