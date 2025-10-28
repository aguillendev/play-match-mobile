import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { usePartidos } from '@/hooks/usePartidos';

const PublicarPartidoScreen: React.FC = () => {
  const { publicarPartido, isLoading } = usePartidos();
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [horaInicio, setHoraInicio] = useState('19:00');
  const [horaFin, setHoraFin] = useState('20:00');
  const [cupo, setCupo] = useState('10');
  const [notas, setNotas] = useState('');

  const onSubmit = () => {
    publicarPartido({
      fecha: fecha.toISOString(),
      horaInicio,
      horaFin,
      cupoMaximo: Number(cupo),
      notas
    })
      .then(() => {
        Alert.alert('Partido publicado', 'Tu partido se publicó correctamente.');
      })
      .catch(() => {
        Alert.alert('Error', 'No se pudo publicar el partido.');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.field} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.value}>{fecha.toLocaleDateString()}</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          onChange={(_, selectedDate) => {
            if (selectedDate) {
              setFecha(selectedDate);
            }
            setShowDatePicker(false);
          }}
        />
      )}
      <View style={styles.field}>
        <Text style={styles.label}>Hora inicio</Text>
        <TextInput value={horaInicio} onChangeText={setHoraInicio} style={styles.input} />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Hora fin</Text>
        <TextInput value={horaFin} onChangeText={setHoraFin} style={styles.input} />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Cupo máximo</Text>
        <TextInput
          value={cupo}
          onChangeText={setCupo}
          keyboardType="number-pad"
          style={styles.input}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Notas</Text>
        <TextInput
          value={notas}
          onChangeText={setNotas}
          style={[styles.input, styles.multiline]}
          multiline
          numberOfLines={3}
        />
      </View>
      <Pressable style={styles.button} onPress={onSubmit} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Publicando...' : 'Publicar partido'}</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16
  },
  field: {
    gap: 6
  },
  label: {
    fontSize: 14,
    color: '#4b5563'
  },
  value: {
    fontSize: 16,
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#16a34a',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default PublicarPartidoScreen;
