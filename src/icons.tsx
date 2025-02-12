import CottageOutlinedIcon from '@mui/Icons-material/CottageOutlined';
import PetsOutlinedIcon from '@mui/Icons-material/PetsOutlined';
import PaidOutlinedIcon from '@mui/Icons-material/PaidOutlined';
import ShoppingBagOutlinedIcon from '@mui/Icons-material/ShoppingBagOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/Icons-material/DirectionsCarFilledOutlined';
import FavoriteBorderOutlinedIcon from '@mui/Icons-material/FavoriteBorderOutlined';
import LoyaltyOutlinedIcon from '@mui/Icons-material/LoyaltyOutlined';
import FamilyRestroomOutlinedIcon from '@mui/Icons-material/FamilyRestroomOutlined';
import LocalGasStationOutlinedIcon from '@mui/Icons-material/LocalGasStationOutlined';
import SmokingRoomsOutlinedIcon from '@mui/Icons-material/SmokingRoomsOutlined';
import RestaurantOutlinedIcon from '@mui/Icons-material/RestaurantOutlined';
import MobileFriendlyOutlinedIcon from '@mui/Icons-material/MobileFriendlyOutlined';
import AddCardOutlinedIcon from '@mui/Icons-material/AddCardOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/Icons-material/HealthAndSafetyOutlined';
import BedroomBabyOutlinedIcon from '@mui/Icons-material/BedroomBabyOutlined';
import ChildCareOutlinedIcon from '@mui/Icons-material/ChildCareOutlined';
import DisabledByDefaultOutlinedIcon from '@mui/Icons-material/DisabledByDefaultOutlined';

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
