import Order from "./Order";

function Orders({ orders }) {
  const items = orders.map((order) => <Order key={order._id} order={order} />);

  return <div>{items}</div>;
}

export default Orders;
