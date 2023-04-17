

const CategoryForm = ({ handleSubmit, value, setValue, description, setDescription }) => {
  
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            name="name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
              <div className="mb-3">
              <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
         </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
