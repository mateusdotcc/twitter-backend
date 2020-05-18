import { Request, Response } from 'express';
import axios from 'axios';

import User from '../models/User';
import File, { IFile } from '../models/File';

class UserController {
  public async index(req: Request, res: Response) {
    const { id } = req.params;

    const loggedUser = await User.findById(id);

    return res.json(loggedUser);
  }

  public async store(req: Request, res: Response) {
    const { username } = req.body;

    const userExists = await User.findOne({ user: username });

    if (userExists) {
      return res.json(userExists);
    }

    const response = await axios.get(
      `https://api.github.com/users/${username}`,
    );

    const {
      name,
      bio,
      avatar_url,
      company,
      followers,
      following,
      html_url,
      location: country,
    } = response.data;

    let userAvatar: IFile = undefined;
    let userCover: IFile = undefined;

    if (req.files) {
      const {
        originalname: avatarName,
        size: avatarSize,
        key: avatarKey,
        location: avatarUrl = '',
      } = req.files[0];

      userAvatar = await File.create({
        name: avatarName,
        size: avatarSize,
        key: avatarKey,
        url: avatarUrl,
      });

      const {
        originalname: coverName,
        size: coverSize,
        key: coverKey,
        location: coverUrl = '',
      } = req.files[1];

      userCover = await File.create({
        name: coverName,
        size: coverSize,
        key: coverKey,
        url: coverUrl,
      });
    }

    const user = await User.create({
      name,
      user: username,
      bio,
      avatar: userAvatar ? userAvatar.url : avatar_url,
      cover: userCover ? userCover.url : '',
      company,
      country,
      followers,
      following,
      html_url,
    });

    return res.json(user);
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    const loggedUser = await User.findById(id);

    if (!loggedUser) {
      return res.status(400).json({ error: 'User not found' });
    }

    let userAvatar: IFile = undefined;
    let userCover: IFile = undefined;

    if (Object.keys(req.files).length > 0) {
      const {
        originalname: coverName,
        size: coverSize,
        key: coverKey,
        location: coverUrl = '',
      } = req.files[1];

      userCover = await File.create({
        name: coverName,
        size: coverSize,
        key: coverKey,
        url: coverUrl,
      });
    }

    if (name) loggedUser.name = name;

    if (userAvatar) loggedUser.avatar = userAvatar.url;

    if (userCover) loggedUser.cover = userCover.url;

    await loggedUser.save();

    return res.json(loggedUser);
  }
}

export default new UserController();
