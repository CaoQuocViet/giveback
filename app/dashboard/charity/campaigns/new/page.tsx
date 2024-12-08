"use client"

import { useRouter } from "next/navigation"
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import { useSession } from "next-auth/react"

export default function NewCampaignPage() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Tạo chiến dịch mới
          </Typography>

          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="title"
                  label="Tên chiến dịch"
                  placeholder="Nhập tên chiến dịch"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="startDate"
                  label="Ngày bắt đầu"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="endDate"
                  label="Ngày kết thúc"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="targetAmount"
                  label="Ngân sách dự kiến"
                  type="number"
                  placeholder="VNĐ"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  label="Mô tả chi tiết"
                  multiline
                  rows={5}
                  placeholder="Nhập mô tả chi tiết về chiến dịch"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="province"
                  label="Tỉnh/Thành phố"
                  placeholder="Chọn tỉnh/thành phố"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="district"
                  label="Quận/Huyện"
                  placeholder="Chọn quận/huyện"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  id="ward"
                  label="Phường/Xã"
                  placeholder="Chọn phường/xã"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  label="Địa chỉ cụ thể"
                  placeholder="Nhập địa chỉ cụ thể"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="image"
                  type="file"
                  inputProps={{ multiple: true, accept: "image/*" }}
                />
                <Typography variant="caption" color="textSecondary">
                  Có thể chọn nhiều ảnh
                </Typography>
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 4,
              }}
            >
              <Button variant="outlined" onClick={() => router.back()}>
                Hủy
              </Button>
              <Button variant="contained" type="submit">
                Tạo mới
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
