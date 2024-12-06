"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { 
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText
} from '@mui/material'

// Mock data - sẽ được thay thế bằng API call
const mockCampaign = {
  id: '1',
  title: 'Hỗ trợ đồng bào miền Trung',
  status: 'ONGOING',
  startDate: '2024-03-01',
  endDate: '2024-04-01',
  targetAmount: 100000000,
  description: 'Mô tả chi tiết về chiến dịch...',
  images: ['image1.jpg', 'image2.jpg']
}

export default function EditCampaignPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Chỉnh sửa chiến dịch
          </Typography>
          
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="title"
                  label="Tên chiến dịch"
                  defaultValue={mockCampaign.title}
                  disabled
                  helperText="Không thể thay đổi tên chiến dịch"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Trạng thái</InputLabel>
                  <Select
                    defaultValue={mockCampaign.status}
                    label="Trạng thái"
                  >
                    <MenuItem value="ONGOING">Đang kêu gọi</MenuItem>
                    <MenuItem value="CLOSED">Đã đóng</MenuItem>
                    <MenuItem value="COMPLETED">Đã kết thúc</MenuItem>
                  </Select>
                  <FormHelperText>
                    Chỉ có thể thay đổi trạng thái theo chiều tăng
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="startDate"
                  label="Ngày bắt đầu"
                  type="date"
                  defaultValue={mockCampaign.startDate}
                  disabled
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="endDate"
                  label="Ngày kết thúc"
                  type="date"
                  defaultValue={mockCampaign.endDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="targetAmount"
                  label="Ngân sách dự kiến"
                  type="number"
                  defaultValue={mockCampaign.targetAmount}
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
                  defaultValue={mockCampaign.description}
                  placeholder="Nhập mô tả chi tiết về chiến dịch"
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
                  Chọn ảnh mới để thay thế ảnh cũ
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
              <Button variant="outlined" onClick={() => router.back()}>
                Hủy
              </Button>
              <Button variant="contained" type="submit">
                Cập nhật
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
} 