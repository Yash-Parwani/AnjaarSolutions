import CustomButton from "components/layout/common/CustomButton";
import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";

import {
  Box,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import CompanyCard from "components/layout/common/CompanyCard";
import { useMemo } from "react";

const AllCompanies = () => {
  const navigate = useNavigate();
  /* data in tableQueryResult will have all data of companies which we will get by getAllProperty controller




  */
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter, setSorter,
    filters, setFilters,
  } = useTable();
  // ensures that if we dont have data, it will default to empty array so that we have no error
  const allCompanies = data?.data ?? [];
 

  //filtering
  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => ('field' in item ? item : []));

    return {
      name: logicalFilters.find((item) => item.field === 'name')?.value || '',
      
    }
  }, [filters]);


  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error</Typography>;
  return (
    <Box>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!allCompanies.length
              ? "There are no properties"
              : "All properties"}
          </Typography>
            <Box
              mb={2}
              mt={3}
              display="flex"
              width="84%"
              justifyContent={"space-between"}
              flexWrap="wrap"
            >
              <Box
                display="flex"
                gap={2}
                flexWrap="wrap"
                mb={{ xs: "20px", sm: 0 }}
              >
                
                <TextField
                  variant="outlined"
                  color="info"
                  placeholder="Search by name"
                  value={currentFilterValues.name}
                  onChange={(e) => {
                    setFilters([
                      {
                        field: 'name',
                        operator: 'contains',
                        value: e.currentTarget.value ? e.currentTarget.value : undefined
                      }
                    ])
                  }}
                />
                
              </Box>
            </Box>
        </Stack>
      </Box>

      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <CustomButton
          title="Add Company"
          handleClick={() => navigate("/companies/create")}
          backgroundColor="#03c9d7"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>

      {/* fetching all companies from db and mapping over it to display it on this page 
      
      Fetching is made easy for us by refine
      refine makes it easy to fetch using useTable hook  which will help us to do pagination,filtering,sorting all in one hook
      
      */}
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {/* mapping allCompanies */}
        {allCompanies.map((company) => (
          <CompanyCard
            key={company._id}
            id={company._id}
            name={company.name}
            address={company.address}
            phone={company.phone}
            email={company.email}
            logo={company.logo}
          />
        ))}
      </Box>
      {/* Creating pagination
         check if there are companies to paginate, empty array ko toh paginate nahi karenge na
      */}

      {allCompanies.length > 0 && (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap">
          <CustomButton
            title="Previous"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="#475be*"
            color="#fcfcfc"
            disabled={!(current > 1)} // disabling previous button if we are on 1st page itself
          />

          <Box
            display={{
              xs: "hidden",
              sm: "flex",
            }}
            alignItems="center"
            gap="5px"
          >
            Page{" "}
            <strong>
              {current} of {pageCount}
            </strong>
          </Box>

          <CustomButton 
            title="Next"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount}
          />

          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue={10}
            onChange={(e) => {setPageSize(e.target.value ? Number(e.target.value) : 10)}}
          >
           {/* To have number of companies listed on a single page */}
            {[10,20,30,40,50].map((size)=>(
              
            <MenuItem key={size} value={size} >Show {size}</MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default AllCompanies;
