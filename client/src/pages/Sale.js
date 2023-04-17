import React from "react";
import Layout from "./../components/Layout/Layout";
import ProductsOnSale from "./../components/ProductsOnSale";
const Sale = () => {
 const nolimit = true
  return (
    <Layout title={"Search results"}>
      <div className="container">
      <ProductsOnSale nolimit={nolimit} />
      </div>
    </Layout>
  )
}

export default Sale
