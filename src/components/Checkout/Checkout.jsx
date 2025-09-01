import { useOutletContext } from 'react-router-dom';

export default function Checkout() {
  const { counter } = useOutletContext();
  return (
    <>
      <div>Checkout</div>
      <div>No:{counter}</div>
    </>
  );
}
