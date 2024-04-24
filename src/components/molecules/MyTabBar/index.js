import {faClipboardList} from '@fortawesome/free-solid-svg-icons/faClipboardList';
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse';
import {faNewspaper} from '@fortawesome/free-solid-svg-icons/faNewspaper';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            style={{
              flex: 1,
              width: '25%',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
            key={index}>
            <TouchableOpacity
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                width: '100%',
                paddingVertical: 7.5,
                alignItems: 'center',
              }}>
              {(() => {
                if (label === 'Beranda') {
                  return (
                    <FontAwesomeIcon
                      icon={faHouse}
                      size={22}
                      color={isFocused ? '#CED7DC' : '#6b7c86'}
                    />
                  );
                }
                if (label === 'Feed') {
                  return (
                    <FontAwesomeIcon
                      icon={faNewspaper}
                      size={22}
                      color={isFocused ? '#CED7DC' : '#6b7c86'}
                    />
                  );
                }
                if (label === 'Transaksi') {
                  return (
                    <FontAwesomeIcon
                      icon={faClipboardList}
                      size={22}
                      color={isFocused ? '#CED7DC' : '#6b7c86'}
                    />
                  );
                }
                if (label === 'Saya') {
                  return (
                    <FontAwesomeIcon
                      icon={faUser}
                      size={22}
                      color={isFocused ? '#CED7DC' : '#6b7c86'}
                    />
                  );
                }
              })()}
              <Text
                style={{
                  color: isFocused ? '#CED7DC' : '#6b7c86',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          </Pressable>
        );
      })}
    </View>
  );
}

export default MyTabBar;
