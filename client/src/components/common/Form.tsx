/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  Button } from '@pankod/refine-mui';

import { FormProps } from 'interfaces/common';
import CustomButton from './CustomButton';

const Form = ({
  type,
  formValues,
  propertyImage,
  loading,
  handleOnChange,
  handleImageChange,
  handleSubmit,
}: FormProps) => (
  <Box>
    <Typography fontSize={25} fontWeight={700} color="#11142D">{type} a Property</Typography>

    <Box
      mt={2.5}
      borderRadius="15px"
      padding="20px"
      bgcolor="#FCFCFC"
    >
      <form
        style={{
          marginTop: '20px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
        onSubmit={handleSubmit}
      >
        <FormControl>
          <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142D' }}>Enter property name</FormHelperText>
          <TextField
            fullWidth
            required
            id="outlined-basic"
            label="Title"
            variant="outlined"
            color="info"
            value={formValues.title}
            onChange={(e) => handleOnChange('title', e)}
          />
        </FormControl>

        <FormControl>
          <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142D' }}>Property Description</FormHelperText>
          <TextareaAutosize
            minRows={5}
            required
            placeholder="Write description of property"
            color="info"
            style={{
              width: '100%',
              background: 'transparent',
              fontSize: '16px',
              borderColor: 'rgba(0, 0, 0, 0.23)',
              borderRadius: 6,
              padding: 10,
              color: '#919191',
            }}
            value={formValues.description}
            onChange={(e) => handleOnChange('description', e)}
          />
        </FormControl>

        <Stack direction="row" gap={4}>
          <FormControl sx={{ flex: 1 }}>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142D',
              }}
            >
              Enter property type
            </FormHelperText>
            <Select
              value={formValues.propertyType}
              variant="outlined"
              color="info"
              displayEmpty
              required
              inputProps={{ 'aria-label': 'Without label' }}
              onChange={(e) => handleOnChange('propertyType', e)}
            >
              <MenuItem value="apartment">Apartment</MenuItem>
              <MenuItem value="villa">Villa</MenuItem>
              <MenuItem value="farmhouse">Farmhouse</MenuItem>
              <MenuItem value="condos">Condos</MenuItem>
              <MenuItem value="townhouse">Townhouse</MenuItem>
              <MenuItem value="duplex">Duplex</MenuItem>
              <MenuItem value="studio">Studio</MenuItem>
              <MenuItem value="chalet">Chalet</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ flex: 1 }}>
            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142D' }}>Enter property price</FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              label="Price"
              variant="outlined"
              color="info"
              type="number"
              value={formValues.price}
              onChange={(e) => handleOnChange('price', e)}
            />
          </FormControl>
        </Stack>

        <FormControl>
          <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142D' }}>Enter location</FormHelperText>
          <TextField
            fullWidth
            required
            id="outlined-basic"
            label="Location"
            variant="outlined"
            color="info"
            value={formValues.location}
            onChange={(e) => handleOnChange('location', e)}
          />
        </FormControl>

        <Stack direction="column" gap={1} justifyContent="center" mb={2}>
          <Stack direction="row" gap={2}>
            <Typography color="#11142D" fontSize={16} fontWeight={500} my="10px">Property Photo</Typography>

            <Button
              component="label"
              sx={{
                width: 'fit-content',
                color: '#2ED480',
                textTransform: 'capitalize',
                fontSize: 16,
              }}
            >
              Upload *
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => {
                  // @ts-ignore
                  handleImageChange(e.target.files[0]);
                }}
              />
            </Button>
          </Stack>
          <Typography
            fontSize={14}
            color="#808191"
            sx={{ wordBreak: 'break-all' }}
          >
            {propertyImage?.name}
          </Typography>
        </Stack>

        <CustomButton
          type="submit"
          title={loading ? 'Submitting...' : 'Submit'}
          backgroundColor="#475BE8"
          color="#FCFCFC"
        />
      </form>
    </Box>
  </Box>
);

export default Form;
