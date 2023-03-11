import React from "react";
import { Typography, Box, Stack } from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";

import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  Star,
} from "@mui/icons-material";
import CustomButton from "components/layout/common/CustomButton";

const CompanyDetails = () => {
  const navigate = useNavigate();
  //getting current user
  const { data: user } = useGetIdentity();
  //getting id of the company we want to view from params
  const { id } = useParams();
  //this thing will allow us to delete a resource
  const { mutate } = useDelete();
  //helps to get data for the resource we are looking at currently
  const { queryResult } = useShow();

  const { data, isLoading, isError } = queryResult;
  console.log(data);

  // handling undefined walla cheez, the same thing we did in allCompanies
  const companyDetails = data?.data ?? {};

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  // implementing deletion logic
  // first check if user is authorized to delete
  const isCurrentUser = user.email === companyDetails.creator.email;

  const handleDeleteCompany = () => {
    // eslint-disable-next-line no-restricted-globals
    const response = confirm("Are you sure you want to delete this company?");
    if (response) {
      mutate(
        {
          resource: "companies",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/companies");
          },
        }
      );
    }
  };

  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#FCFCFC"
      width="fit-content"
    >
      <Typography fontSize={25} fontWeight={700} color="#11142D">Details</Typography>

      <Box mt="20px" display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>

        <Box flex={1} maxWidth={764}>
          <img
            src={companyDetails.logo}
            alt={companyDetails.name}
            height={546}
            style={{ objectFit: 'cover', borderRadius: '10px' }}
           
          />

          <Box mt="15px">
          
            <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={2}>
              <Box>
                <Typography fontSize={22} fontWeight={600} mt="10px" color="#11142D">{companyDetails.name}</Typography>
                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                  <Place sx={{ color: '#808191' }} />
                  <Typography fontSize={14} color="#808191">{companyDetails.address}</Typography>
                </Stack>
              </Box>

             
            </Stack>

           
          </Box>
        </Box>

        <Box width="100%" flex={1} maxWidth={326} display="flex" flexDirection="column" gap="20px">
          <Stack
            width="100%"
            p={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="1px solid #E4E4E4"
            borderRadius={2}
          >

            <Stack width="100%" mt="25px" direction="row" flexWrap="wrap" gap={2}>
              <CustomButton
                title={isCurrentUser ? 'Edit' : ''}
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
                icon={isCurrentUser ? <Edit /> :''}
                handleClick={() => {
                  if (isCurrentUser) {
                    navigate(`/companies/edit/${companyDetails._id}`);
                  }
                }}
              />
              <CustomButton
                title={isCurrentUser ? 'Delete' : " "}
                backgroundColor={!isCurrentUser ? '#2ED480' : '#d42e2e'}
                color="#FCFCFC"
                fullWidth
                icon={isCurrentUser ? <Delete /> : ""}
                handleClick={() => {
                  if (isCurrentUser) handleDeleteCompany();
                }}
              />
            </Stack>
          </Stack>

         
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyDetails;
