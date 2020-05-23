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

    const [response, responseCover] = await Promise.all([
      await axios.get(`https://api.github.com/users/${username}`),
      await axios.get('https://picsum.photos/v2/list?page=1&limit=1'),
    ]);

    const {
      name,
      bio,
      company,
      followers,
      following,
      html_url,
      login: nickname,
      avatar_url: avatar,
      location: country,
    } = response.data;

    const { download_url: cover } = responseCover.data[0];

    const user = await User.create({
      name,
      bio,
      avatar,
      cover,
      company,
      country,
      followers,
      following,
      html_url,
      user: nickname,
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

    let userAvatar: any | IFile;
    let userCover: any | IFile;

    if (Object.keys(req.files).length > 0) {
      let files: any | Express.Multer.File = req.files;

      if (files[0].fieldname === 'avatar') {
        const { originalname: name, size, key, location: url = '' } = files[0];

        userAvatar = await File.create({
          name,
          size,
          key,
          url,
        });
      }

      if (files[0].fieldname === 'cover' || files[1]?.fieldname === 'cover') {
        const { originalname: name, size, key, location: url = '' } =
          files[0] || files[1];

        userCover = await File.create({
          name,
          size,
          key,
          url,
        });
      }
    }

    if (name) loggedUser.name = name;
    if (userAvatar) loggedUser.avatar = userAvatar.url;
    if (userCover) loggedUser.cover = userCover.url;

    await loggedUser.save();

    return res.json(loggedUser);
  }
}

export default new UserController();
