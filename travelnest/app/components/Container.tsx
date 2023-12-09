'use client';

// interface for the 'Container' component
interface ContainerAttributes {
    children: React.ReactNode; 
}

// 'Container' functional component
export const Container: React.FC<ContainerAttributes> = ({
    children
}) => {
  return (
    <div className="
              max-w-[2520px] 
              mx-auto 
              xl:px-20 
              md:px-10 
              sm:px-2 
              px-4">
        {children}
    </div>
  );
}

