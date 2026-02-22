import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';

interface ZoomControlsProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ZoomControls({ scale, onZoomIn, onZoomOut, onReset }: ZoomControlsProps) {
  return (
    <div className="absolute bottom-44 right-3 z-20 flex flex-col gap-2">
      <Button
        onClick={onZoomIn}
        size="icon"
        className="h-12 w-12 rounded-full bg-white border-2 border-[#A5968A] text-[#A82227] hover:bg-[#FCE8E9] shadow-lg"
      >
        <ZoomIn className="h-5 w-5" />
      </Button>
      
      <div className="bg-white border-2 border-[#A5968A] rounded-full px-3 py-2 text-center shadow-lg">
        <p className="text-xs font-bold text-[#A82227]">{Math.round(scale * 100)}%</p>
      </div>
      
      <Button
        onClick={onZoomOut}
        size="icon"
        className="h-12 w-12 rounded-full bg-white border-2 border-[#A5968A] text-[#A82227] hover:bg-[#FCE8E9] shadow-lg"
      >
        <ZoomOut className="h-5 w-5" />
      </Button>
      
      <Button
        onClick={onReset}
        size="icon"
        className="h-12 w-12 rounded-full bg-white border-2 border-[#A5968A] text-[#A82227] hover:bg-[#FCE8E9] shadow-lg"
      >
        <Maximize2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
