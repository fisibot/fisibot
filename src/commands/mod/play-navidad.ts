import { createReadStream } from 'node:fs';
import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioPlayer, createAudioResource, joinVoiceChannel,
} from '@discordjs/voice';
import {
  ChannelType,
  ChatInputCommandInteraction, SlashCommandSubcommandBuilder,
} from 'discord.js';
import { FisiSlashSubcommand } from '@fisitypes';

import { join } from 'node:path';

function playToribianitos(audioPlayer: AudioPlayer, index: number) {
  const max = 3;
  const path = join(__dirname, '..', '..', 'assets', 'musics', `toribianitos${(index % max) + 1}.opus`);
  console.log('Playing 24/7 ', path);
  audioPlayer.play(createAudioResource(createReadStream(path)));
}

const christmasPlay: FisiSlashSubcommand = {
  data: new SlashCommandSubcommandBuilder()
    .setName('play-navidad')
    .setDescription('Invoca a Fisibot a reproducir villancicos 24/7 en tu canal de voz'),

  run: async (interaction: ChatInputCommandInteraction) => {
    const voiceChannel = interaction.guild?.members.cache.get(interaction.user.id)?.voice.channel;

    if (!voiceChannel || voiceChannel.type !== ChannelType.GuildVoice) {
      return interaction.reply({
        content: 'Debes estar en un canal de voz para usar este comando',
        ephemeral: true,
      });
    }
    let musicIndex = 0;

    const player = createAudioPlayer();
    try {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });
      connection.subscribe(player);

      playToribianitos(player, musicIndex++);
    }
    catch (error) {
      console.error('Audio setup fatal error: ', { error });
      return interaction.reply({
        content: '**Fatal error:** No se pudo reproducir la música',
        ephemeral: true,
      });
    }

    player.on('error', (error) => {
      console.error('Audio playing fatal error: ', { error });
    });

    player.on(AudioPlayerStatus.Idle, () => {
      playToribianitos(player, musicIndex++);
    });

    return interaction.reply({
      embeds: [{
        description: `🎄 Tocando villancicos 24/7 en <#${voiceChannel.id}>`,
        color: 0xc54245,
      }],
      ephemeral: true,
    });
  },
};

export default christmasPlay;
