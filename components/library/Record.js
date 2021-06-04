import * as React from 'react';
import { View, Button } from 'react-native';
import { Audio } from 'expo-av';
import * as FS from 'expo-file-system';
import Dialog from "react-native-dialog";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addSample} from "../../redux/library/recorded/actions";

export const Record = (props) => {
    const samples = useSelector(state => state.samples.samples);
    const navigation = props.navigation;
    const samplesDir = FS.documentDirectory + 'samplesDir/';

    const [recording, setRecording] = useState();
    const [sampleName, setSampleName] = useState();
    const [visible, setVisible] = useState(true);
    const [sample, setSample] =  useState();
    const dispatch = useDispatch();

    function generateID(){
        function chr4(){
            return Math.random().toString(16).slice(-4);
        }
        return chr4() + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() + chr4() + chr4();
    }

    async function ensureDirExists() {
        await FS.deleteAsync(samplesDir)
        const dirInfo = await FS.getInfoAsync(samplesDir);
        if (!dirInfo.exists) {
            console.log("Samples directory doesn't exist, creating...");
            await FS.makeDirectoryAsync(samplesDir, { intermediates: true });
        }
    }

    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function createSample(url) {
        const sample = {id: generateID(), name: sampleName, url: url}
        await setSample(sample)
        dispatch(addSample(sample));
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await ensureDirExists();
        const uri = recording.getURI()
        const newuri = samplesDir + sampleName + ".caf";

        await FS.copyAsync({
            from : uri , to : newuri
        })
        console.log('Recording stopped and stored at', newuri);

        await createSample(newuri);
    }

    const handleName = () => {
        setVisible(false);
    };

    return (
        <View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Record Name</Dialog.Title>
                <Dialog.Description>
                    Nom du sample? (.wav)
                </Dialog.Description>
                <Dialog.Input onChangeText={(text) => setSampleName(text) }/>
                <Dialog.Button label="Annuler" onPress={() => {
                    navigation.navigate('Main');
                }} />
                <Dialog.Button label="Valider" onPress={handleName}/>
            </Dialog.Container>
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />
        </View>
    );
}
