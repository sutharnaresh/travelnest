'use client';

import { Button } from "./Button";
import { useRouter } from "next/navigation";
import Heading from "./Heading";

interface NoResult{
  showReset?:boolean;
  title?:string;
  subtitle?:string;
}

export const EmptyState:React.FC<NoResult>= ({
  showReset,
  title="No matches",
  subtitle="Try removing some filters"
}) => {
    const router=useRouter();

  return (
    <div 
    className="h-[60vh] flex flex-col gap-2 justify-center items-center">
        <Heading
        center
        title={title}
        subtitle={subtitle}/>
        <div className="w-48 mt-4">
          {showReset && (
            <Button
              outline
              label="Remove all of the filters"
              onClick={()=>router.push('/')}
            />
          )}
        </div>
    </div>
  )
}
