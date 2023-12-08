import { useEffect, useRef } from 'react';
import { Text, View, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';

const FeaturedItem = (props) => {
    const { item } = props;

    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={{ uri: baseUrl + item.image }}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 20
                            }}
                        >
                            {item.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20 }}>{item.description}</Text>
            </Card>
        );
    }
    return <View />;
};

const HomeScreen = () => {
    const campsites = useSelector((state) => state.campsites);
    const promotions = useSelector((state) => state.promotions);
    const partners = useSelector((state) => state.partners);
    const scaleValue = useRef(new Animated.Value(0)).current;
    const scaleAnimation = Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
    });

    const featCampsite = campsites.campsitesArray.find((item) => item.featured);
    const featPromotion = promotions.promotionsArray.find(
        (item) => item.featured
    );
    const featPartner = partners.partnersArray.find((item) => item.featured);

    useEffect(() => {
        scaleAnimation.start();
    }, []);

    return (
        <Animated.ScrollView style={{ transform: [{ scale: scaleValue }] }}>
            <FeaturedItem
                item={featCampsite}
                isLoading={campsites.isLoading}
                errMess={campsites.errMess}
            />
            <FeaturedItem
                item={featPromotion}
                isLoading={promotions.isLoading}
                errMess={promotions.errMess}
            />
            <FeaturedItem
                item={featPartner}
                isLoading={partners.isLoading}
                errMess={partners.errMess}
            />
        </Animated.ScrollView>
    );
};

export default HomeScreen;


/*
1.  Why is View returned at the end of the FeaturedItem function?
    - The View is returned at the end of the FeaturedItem function to render an empty view (<View />) 
      when the item prop is falsy, preventing errors and ensuring the component can handle cases
      where there's no featured item to display.


////////Animations Animated API:
1. Why is useRef used here?

useRef is used to create a mutable object (scaleValue) that persists across renders without causing a re-render, commonly used for storing and accessing mutable values in functional components.

2. Explain this line: scaleValue = useRef(new Animated.Value(0)).current;

The line initializes a scaleValue variable using useRef and sets it to a new instance of Animated.Value starting at 0.

3. What is Animated.Value? and .current?

Animated.Value is an object in the Animated API representing an animated value. .current gives direct access to the animated value stored in the ref.

4. What is Animated.timing?

Animated.timing is a method for creating a timing animation. It animates a value over time, defining the destination value and duration.

5. What is useNativeDriver?

useNativeDriver is a performance optimization. Setting it to true moves the animation execution to the native thread, improving performance.

6. Summarize how the code functions, identifying key parts and what they do.

The code initializes an animated scale value (scaleValue), creates a timing animation (scaleAnimation) that scales 
from 0 to 1 over 1500 milliseconds. useNativeDriver optimizes performance. scaleValue can be used to drive animated 
styles or components in a React Native application.
//////////////////////////



*/