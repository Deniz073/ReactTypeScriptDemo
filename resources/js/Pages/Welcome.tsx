import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef, MouseEvent } from 'react';

interface Props {
  defaultCount: number;
}

export default function Welcome({ defaultCount }: Props) {
  const [count, setCount] = useState(defaultCount || 0);
  const incrementEl = useRef(null);
  const decrementEl = useRef(null);

  function handleClick(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {

    if (e.target === incrementEl.current) {
      setCount(count => count + 1);
    }
    else if (e.target === decrementEl.current) {
      setCount(count => count - 1);
    }

  }

  // useEffect(() => {
  //     setCount(count => count + 1);
  // }, []);

  return (
    <>
      <Head title="Welcome" />

      <div className="d-flex h-100 align-items-center">
        <div className="mx-auto ml-2">
          <h3 className='text-center'>Count: {count}</h3>

          <div className="d-flex">
            <button className="btn btn-primary me-2" ref={incrementEl} onClick={e => handleClick(e)}>Increment</button>
            <button className="btn btn-secondary" ref={decrementEl} onClick={e => handleClick(e)}>Decrement</button>
          </div>
          {
            count > 10 && (
              <div className="alert alert-success mt-2">
                Count is greater than 10
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}
