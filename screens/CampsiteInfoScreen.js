import { FlatList, StyleSheet, Text, View, Button, Modal } from 'react-native';
import { Rating, Input } from 'react-native-elements';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { postComment } from '../features/comments/commentsSlice';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id
        };
        dispatch(postComment(newComment));
        setShowModal(!showModal);
    }

    const resetForm = () => {
        setRating(5),
        setAuthor(''),
        setText('')
    }

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating
                    type='star'
                    startingValue={item.rating}
                    imageSize={10}
                    readonly
                    style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
                />
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        );
    };

    return (
        <>
            <FlatList
                data={comments.commentsArray.filter(
                    (comment) => comment.campsiteId === campsite.id
                )}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    marginHorizontal: 20,
                    paddingVertical: 20
                }}
                ListHeaderComponent={
                    <>
                        <RenderCampsite
                            campsite={campsite}
                            isFavorite={favorites.includes(campsite.id)}
                            markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                            onShowModal={() => setShowModal(!showModal)}
                        />
                        <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }
            />
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <Rating
                        showRating
                        startingValue={rating}
                        imageSize={40}
                        onFinishRating={(rating) => setRating(rating)}
                        style={{ paddingVertical: 10, paddingTop: 20 }}
                    >
                    </Rating>
                    <Input
                        placeholder={'name'}
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(author) => setAuthor(author)}
                        value={author}
                    >
                    </Input>
                    <Input
                        placeholder={'comment'}
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(text) => setText(text)}
                        value={text}
                    >
                    </Input>
                    <View style={{ margin: 10, backgroundColor: '#5637DD', borderRadius: 10 }} >
                        <Button
                            onPress={() => {
                                handleSubmit();
                                resetForm()
                            }}
                            color='#fff'
                            title='Submit'
                        >
                        </Button>
                    </View>
                    <View style={{ margin: 10, backgroundColor: '#D3D3D3', borderRadius: 10 }} >
                        <Button
                            onPress={() => {
                                setShowModal(!showModal);
                                resetForm();
                            }}
                            color='#808080'
                            title='Cancel'
                        >
                        </Button>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default CampsiteInfoScreen;

/*

In the createStackNavigator configuration, the options property takes a function that receives a route object. 
It extracts the campsite parameter from the route to dynamically set the title of the screen based on the campsite's name.

In the functional component CampsiteInfoScreen, the route is received as a prop. It contains information about the navigation
route, including parameters passed to it. This allows access to the campsite parameter, facilitating dynamic rendering based
on the selected campsite.

The route object is destructured to extract the campsite parameter, which holds information about the selected campsite. 
This information is used to display details about the specific campsite within the CampsiteInfoScreen component.

In the renderCommentItem function, the parameter { item } refers to an element of the comments array. This structure is 
common in React Native's FlatList component, where each item in the data array is passed as a parameter to the renderItem 
function for rendering in the list. In this case, it renders a view containing comment details such as text, rating, author, and date.



1. what is the renderItem function and provide the syntax / structure?
2. is renderCommentItem a renderItem function?
3. How is {item} connected to the comments array?


1. renderItem Function:
The renderItem function is used in React Native's FlatList component to specify how each item in the data array should be 
rendered. Its structure typically includes a parameter (commonly named { item }) representing the current item being 
processed, and it returns the JSX (UI elements) to be rendered for that item.

const renderItem = ({ item }) => {
    // JSX for rendering the item
};
2. renderCommentItem as renderItem:
RenderCommentItem serves as a custom renderItem function. It defines how individual comment items should be rendered 
within the FlatList.

3. {item} and Comments Array:
{item} is the parameter used within the renderCommentItem function to represent an element of the comments array. 
In the FlatList component, the data prop is set to the filtered comments array, and for each item in this array, 
the renderItem function (renderCommentItem in this case) is called to render the corresponding UI elements. 
The connection is established through the data passed to the FlatList.


How is a renderItem function declared?
-   A renderItem function is declared as a JavaScript arrow function, commonly taking a single parameter { item } to represent 
    the current item in the data array. The function returns JSX code defining the UI elements for rendering that specific item.
    This function is then passed as a prop to the FlatList component in React Native, specifying how each item in the list 
    should be rendered. The structure typically looks like:

Example:
const renderItem = ({ item }) => {
    // JSX for rendering the item
};

Do we have to name the renderItem function renderItem? How is the renderItem function declared ?
How does react know that it is a renderItem function? 
-   The renderItem function doesn't have to be named renderItem; it's a convention. 
    When defining a custom renderItem function, you can choose any valid function name. 
    The essential factor is that you pass this function as the renderItem prop to the FlatList component. 
    React doesn't inherently recognize it as "renderItem"; rather, it interprets the function passed to the renderItem 
    prop and utilizes it during the rendering process. The declaration follows the typical structure of a 
    JavaScript arrow function, often taking a parameter like { item } to represent the current item in the data array and 
    returning JSX code for rendering. The association between your custom function and the rendering process is established by 
    explicitly passing it as the renderItem prop when configuring the FlatList.


The FlatList needs to be at the top of the components tree to properly calculate scroll height nd to make the entire page scrollable
using RenderCampsite to pass it a prop to tell it what to render.
to get the campsite param from the route.params object which is where all the 
params for this rout e are located

*/

