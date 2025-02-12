import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined';
import SmokingRoomsOutlinedIcon from '@mui/icons-material/SmokingRoomsOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import MobileFriendlyOutlinedIcon from '@mui/icons-material/MobileFriendlyOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import BedroomBabyOutlinedIcon from '@mui/icons-material/BedroomBabyOutlined';
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';

export const icons: any = {
    home: <CottageOutlinedIcon />,
    pet: <PetsOutlinedIcon />,
    money: <PaidOutlinedIcon />,
    shop: <ShoppingBagOutlinedIcon />,
    car: <DirectionsCarFilledOutlinedIcon />,
    heart: <FavoriteBorderOutlinedIcon />,
    sale: <LoyaltyOutlinedIcon />,
    family: <FamilyRestroomOutlinedIcon />,
    gas: <LocalGasStationOutlinedIcon />,
    smoke: <SmokingRoomsOutlinedIcon />,
    cafe: <RestaurantOutlinedIcon />,
    mobile: <MobileFriendlyOutlinedIcon />,
    card: <AddCardOutlinedIcon />,
    health: <HealthAndSafetyOutlinedIcon />,
    baby: <BedroomBabyOutlinedIcon />,
    child: <ChildCareOutlinedIcon />,
    cross: <DisabledByDefaultOutlinedIcon />,
};

export const CATEGORIES = Array.from(Object.keys(icons));
