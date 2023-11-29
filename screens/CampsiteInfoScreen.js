import RenderCampsite from '../features/campsites/RenderCampsite';

const CampsiteInfoScreen = ({route}) => {
    const { campsite } = route.params;                    
    return <RenderCampsite campsite={campsite} />;
};

export default CampsiteInfoScreen;



// using RenderCampsite to pass it a prop to tell it what to render.
// to get the campsite param from the route.params object which is where all the params for this rout e are located



