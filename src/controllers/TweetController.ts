import { Request, Response } from 'express';

import User from '../models/User';

class TweetController {
  public async store(req: Request, res: Response) {
    const { id } = req.params;
    const { tweet } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ error: 'User not exists' });
    }

    user.tweets.push(tweet);

    await user.save();

    return res.json(user);
  }
}

export default new TweetController();
