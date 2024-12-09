"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

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
  const [selectedProvince, setSelectedProvince] = useState(defaultValues?.province || "")
  const [selectedDistrict, setSelectedDistrict] = useState(defaultValues?.district || "")
  const [selectedWard, setSelectedWard] = useState(defaultValues?.ward || "")
  const [address, setAddress] = useState(defaultValues?.address || "")

  useEffect(() => {
    // Fetch địa chỉ từ file JSON
    fetch("/api/address-data")
      .then(res => res.json())
      .then(data => setAddressData(data))
  }, [])

  const provinces = Object.keys(addressData)
  const districts = selectedProvince ? Object.keys(addressData[selectedProvince]?.districts || {}) : []
  const wards = selectedDistrict ? Object.keys(addressData[selectedProvince]?.districts[selectedDistrict]?.wards || {}) : []

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
              address
            })
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn tỉnh/thành phố" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province} value={province}>
                {addressData[province].name}
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
              address
            })
          }}
          disabled={!selectedProvince}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn quận/huyện/thị xã" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>
                {addressData[selectedProvince].districts[district].name}
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
              address
            })
          }}
          disabled={!selectedDistrict}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn phường/xã/thị trấn" />
          </SelectTrigger>
          <SelectContent>
            {wards.map((ward) => (
              <SelectItem key={ward} value={ward}>
                {addressData[selectedProvince].districts[selectedDistrict].wards[ward].name}
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
              address: e.target.value
            })
          }}
          placeholder="Nhập địa chỉ chi tiết"
        />
      </div>
    </div>
  )
} 