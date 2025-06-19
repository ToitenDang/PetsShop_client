import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const token = "74461aaa-4bf1-11f0-9b81-222185cb68c8";

const ShippingAddressSelector = ({ onShippingFeeCalculated, setProvince, setDistrict, setWard }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const [districtId, setDistrictId] = useState(null);
  const [wardCode, setWardCode] = useState(null);

  useEffect(() => {
    axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
      headers: { token }
    }).then(res => setProvinces(res.data.data));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
        headers: { token },
        params: { province_id: selectedProvince }
      }).then(res => setDistricts(res.data.data));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
        headers: { token },
        params: { district_id: selectedDistrict }
      }).then(res => setWards(res.data.data));
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (districtId && wardCode) {
      // Replace with your real from_district_id and service_type_id
      axios.post('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
        //from_district_id: 1542, 
        service_type_id: 2, 
        to_district_id: districtId,
        to_ward_code: wardCode,
        weight: 2000, 
      }, {
        headers: {
          token,
          shop_id: 196893 // bắt buộc nếu bạn dùng môi trường thật
        }
      }).then(res => {
        onShippingFeeCalculated(res.data.data.total); // trả kết quả về parent
      });
    }
  }, [districtId, wardCode]);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant='body1' mb={1}>Khu vực giao hàng:</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Tỉnh / Thành phố</InputLabel>
        <Select
          value={selectedProvince}
          onChange={(e) => {
            setSelectedProvince(e.target.value);
            setSelectedDistrict('');
            setSelectedWard('');
            setDistricts([]);
            setWards([]);
          }}
          label="Tỉnh / Thành phố"
        >
          {provinces.map((p) => (
            <MenuItem key={p.ProvinceID} value={p.ProvinceID} onClick={() => {setProvince(p.ProvinceName)}}>{p.ProvinceName}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }} disabled={!districts.length}>
        <InputLabel>Quận / Huyện</InputLabel>
        <Select
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            setSelectedWard('');
            setWards([]);
            const selected = districts.find(d => d.DistrictID === e.target.value);
            setDistrictId(e.target.value);
          }}
          label="Quận / Huyện"
        >
          {districts.map((d) => (
            <MenuItem key={d.DistrictID} value={d.DistrictID} onClick={() => {setDistrict(d.DistrictName)}}>{d.DistrictName}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth disabled={!wards.length}>
        <InputLabel>Phường / Xã</InputLabel>
        <Select
          value={selectedWard}
          onChange={(e) => {
            setSelectedWard(e.target.value);
            setWardCode(e.target.value);
          }}
          label="Phường / Xã"
        >
          {wards.map((w) => (
            <MenuItem key={w.WardCode} value={w.WardCode} onClick={() => {setWard(w.WardName)}}>{w.WardName}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ShippingAddressSelector;
