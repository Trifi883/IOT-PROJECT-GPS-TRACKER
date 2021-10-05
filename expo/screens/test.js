/*import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';





<Modal
          isVisible={state.visibleModal === 3}
          animationInTiming={2000}
          animationOutTiming={2000}
          backdropTransitionInTiming={2000}
        backdropTransitionOutTiming={2000}
        >
     <View> 

      <MapView  style={styles.container} showsUserLocation={true}  followUserLocation={true}>
        
        <MapView.Marker 
          coordinate={{
            longitude: location ? location?.coords?.longitude : 0,
            latitude: location ? location?.coords?.latitude : 0,
          }}
          title={'UserName'}
          description={'location'}
        > 
            <View style={styles.container}> 
            {_renderButton('A slower modal', () => this.setState({ visibleModal: 3}))}
        
        
          {_renderModalContent()}
       


        </View>


        </MapView.Marker>
      </MapView>
    </View>
      </Modal>









































// You can import from local files
import DropDownPicker from 'react-native-dropdown-picker';

export default function test() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}></Text>
      <DropDownPicker
        items={[
          { iconlabel: 'English', value: 'br' },
          { icon: ' ', label: ' Toyota', value: '' },
          { label: 'Mercedes-Benz', value: '' },
          { label: 'BMW', value: '' },
          { label: 'Honda', value: '' },
          { label: 'Hyundai', value: '' },
          { label: 'Tesla', value: '' },
          { label: 'Ford', value: '' },
          { label: 'Audi', value: '' },
          { label: 'volkswagen', value: '' },
          { label: 'Porshe', value: '' },
          { label: 'Nissan', value: '' },
          { label: 'Ferrari', value: '' },
          { label: 'KiA', value: '' },
          { label: 'LandRover', value: '' },
          { label: 'Mini', value: '' },
        ]}
        defaultIndex={0}
        containerStyle={{ height: 40 }}
        onChangeItem={(item) => console.log(item.label, item.value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
*/