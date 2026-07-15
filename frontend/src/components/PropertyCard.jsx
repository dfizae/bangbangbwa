import { Heart } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatPrice, toPyeong } from "@/lib/format"

// PROP-02 목록 카드. 저장 토글(PROP-04·05)은 onToggleSave로, 상세 이동(PROP-03)은 onOpen으로 위임.
function PropertyCard({ property, onToggleSave, onOpen }) {
  const { title, dealType, buildingType, region, dong, areaM2, floor, totalFloors, rooms, saved } =
    property

  return (
    <Card
      className="cursor-pointer gap-4 py-5 transition-shadow hover:shadow-md"
      role="link"
      tabIndex={0}
      aria-label={`${title} 상세 보기`}
      onClick={() => onOpen(property.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen(property.id)
      }}
    >
      <CardHeader className="px-5">
        <div className="flex items-center gap-1.5">
          <Badge>{dealType}</Badge>
          <Badge variant="secondary">{buildingType}</Badge>
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            size="icon"
            aria-label={saved ? "매물 저장 취소" : "매물 저장"}
            aria-pressed={saved}
            onClick={(e) => {
              e.stopPropagation()
              onToggleSave(property.id)
            }}
          >
            <Heart
              className={
                saved ? "fill-primary text-primary" : "text-muted-foreground"
              }
            />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-5">
        <p className="text-xl font-bold text-primary">
          {formatPrice(property)}
          <span className="ml-1 text-xs font-normal text-muted-foreground">
            만원
          </span>
        </p>
        <p className="mt-2 text-sm text-foreground">
          {region} {dong}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {areaM2}㎡({toPyeong(areaM2)}평) · {floor}/{totalFloors}층 · 방{rooms}
        </p>
      </CardContent>
    </Card>
  )
}

export default PropertyCard
