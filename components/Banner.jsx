import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { AlertTriangle, CheckCircleIcon } from "lucide-react";

const bannerVariants = cva(
  'border text-center p-4 text-sm flex items-center w-full',
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-primary",
        success: 'bg-emerald-700 border-emerald-800 text-secondray'
      }
    },
    defaultVariants: {
      variant: 'warning'
    }
  }
)

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon
}

export default function Banner({label, variant}) {
  const Icon = iconMap[variant || 'warning']
  return (
      <div className={cn(bannerVariants({variant}))}>
        <Icon className="h-4 w-4 mr-2"/>
        {label}
      </div>
  )
}