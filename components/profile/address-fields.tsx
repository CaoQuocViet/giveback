"use client"

import { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AddressData {
  [key: string]: {
    name: string
    districts: {
      [key: string]: {
        name: string
        wards: {
          [key: string]: {
            name: string
          }
        }
      }
    }
  }
}

interface AddressFieldsProps {
  defaultValues?: {
    province?: string
    district?: string
    ward?: string
    address?: string
  }
  onChange: (values: {
    province: string
    district: string
    ward: string
    address: string
  }) => void
}

export function AddressFields({ defaultValues, onChange }: AddressFieldsProps) {
  const [addressData, setAddressData] = useState<AddressData>({})
  const [provinces, setProvinces] = useState<
    Array<{ code: string; name: string }>
  >([])
  const [districts, setDistricts] = useState<
    Array<{ code: string; name: string }>
  >([])
  const [wards, setWards] = useState<Array<{ code: string; name: string }>>([])

  const [selectedProvince, setSelectedProvince] = useState(
    defaultValues?.province || ""
  )
  const [selectedDistrict, setSelectedDistrict] = useState(
    defaultValues?.district || ""
  )
  const [selectedWard, setSelectedWard] = useState(defaultValues?.ward || "")
  const [address, setAddress] = useState(defaultValues?.address || "")

  // Fetch provinces when component mounts
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/administrative/provinces`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProvinces(data.data)
        }
      })
      .catch((err) => console.error("Error fetching provinces:", err))
  }, [])

  // Fetch districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/administrative/districts/${selectedProvince}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setDistricts(data.data)
          }
        })
        .catch((err) => console.error("Error fetching districts:", err))
    } else {
      setDistricts([])
    }
  }, [selectedProvince])

  // Fetch wards when district changes
  useEffect(() => {
    if (selectedProvince && selectedDistrict) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/administrative/wards/${selectedProvince}/${selectedDistrict}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setWards(data.data)
          }
        })
        .catch((err) => console.error("Error fetching wards:", err))
    } else {
      setWards([])
    }
  }, [selectedProvince, selectedDistrict])

  return (
    <div className="grid gap-4">
      <div>
        <label className="text-sm font-medium">Tỉnh/Thành phố</label>
        <Select
          value={selectedProvince}
          onValueChange={(value) => {
            setSelectedProvince(value)
            setSelectedDistrict("")
            setSelectedWard("")
            onChange({
              province: value,
              district: "",
              ward: "",
              address,
            })
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn tỉnh/thành phố" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province.code} value={province.code}>
                {province.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium">Quận/Huyện/Thị xã</label>
        <Select
          value={selectedDistrict}
          onValueChange={(value) => {
            setSelectedDistrict(value)
            setSelectedWard("")
            onChange({
              province: selectedProvince,
              district: value,
              ward: "",
              address,
            })
          }}
          disabled={!selectedProvince}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn quận/huyện/thị xã" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district.code} value={district.code}>
                {district.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium">Phường/Xã/Thị trấn</label>
        <Select
          value={selectedWard}
          onValueChange={(value) => {
            setSelectedWard(value)
            onChange({
              province: selectedProvince,
              district: selectedDistrict,
              ward: value,
              address,
            })
          }}
          disabled={!selectedDistrict}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn phường/xã/thị trấn" />
          </SelectTrigger>
          <SelectContent>
            {wards.map((ward) => (
              <SelectItem key={ward.code} value={ward.code}>
                {ward.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium">Số/Đường/Ấp</label>
        <Input
          value={address}
          onChange={(e) => {
            setAddress(e.target.value)
            onChange({
              province: selectedProvince,
              district: selectedDistrict,
              ward: selectedWard,
              address: e.target.value,
            })
          }}
          placeholder="Nhập địa chỉ chi tiết"
        />
      </div>
    </div>
  )
}
